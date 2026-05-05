import hmac
import hashlib
import time
import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from dotenv import load_dotenv

load_dotenv()

URL_SECRET = os.getenv('URL_SECRET', 'career-intelligence-salt-2024')

def get_buffer_32(secret):
    """Matches Node's Buffer.alloc(32, URL_SECRET) behavior."""
    secret_bytes = secret.encode('utf-8')
    if not secret_bytes:
        return b'\x00' * 32
    # Repeat the secret to fill 32 bytes, then truncate
    repeated = (secret_bytes * (32 // len(secret_bytes) + 1))[:32]
    return repeated

def generate_secure_token(job_id: str, client_id: str) -> str:
    """Matches Node's generateSecureToken logic (HMAC-SHA256, hourly rotation)."""
    hour_timestamp = int(time.time() // (60 * 60))
    data = f"{job_id}:{client_id}:{hour_timestamp}"
    
    signature = hmac.new(
        URL_SECRET.encode('utf-8'),
        data.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return signature[:16]

def verify_secure_token(job_id: str, client_id: str, token: str) -> bool:
    """Verifies the secure token."""
    expected = generate_secure_token(job_id, client_id)
    return token == expected

def obfuscate_id(id_val: str) -> str:
    """Matches Node's obfuscateId logic (AES-256-CBC)."""
    if not id_val:
        return ""
    
    key = get_buffer_32(URL_SECRET)
    iv = b'\x00' * 16
    
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    
    # Node's crypto uses PKCS#7 padding by default for createCipheriv
    # But wait, looking at the Node code:
    # const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.alloc(32, URL_SECRET), Buffer.alloc(16, 0));
    # let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
    # encrypted += cipher.final('hex');
    
    # We need to apply PKCS#7 padding
    data_bytes = str(id_val).encode('utf-8')
    padding_len = 16 - (len(data_bytes) % 16)
    padded_data = data_bytes + bytes([padding_len] * padding_len)
    
    encrypted = encryptor.update(padded_data) + encryptor.finalize()
    return encrypted.hex()

def deobfuscate_id(hashed_id: str) -> str:
    """Matches Node's deobfuscateId logic (AES-256-CBC)."""
    if not hashed_id:
        return None
    
    try:
        key = get_buffer_32(URL_SECRET)
        iv = b'\x00' * 16
        
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        
        encrypted_bytes = bytes.fromhex(hashed_id)
        decrypted_padded = decryptor.update(encrypted_bytes) + decryptor.finalize()
        
        # Remove PKCS#7 padding
        padding_len = decrypted_padded[-1]
        if padding_len < 1 or padding_len > 16:
            return None # Invalid padding
            
        return decrypted_padded[:-padding_len].decode('utf-8')
    except Exception:
        return None

def hash_password(password: str) -> str:
    """Matches legacy Node.js SHA256 hashing."""
    if not password:
        return ""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()
