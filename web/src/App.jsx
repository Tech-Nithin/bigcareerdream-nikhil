import { BrowserRouter, Routes, Route, Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import TopNavbar from './components/TopNavbar';
import LeftSidebar from './components/LeftSidebar';
import ProductTour from './components/ProductTour';
import ResumeUploadModal from './components/ResumeUploadModal';
import HelpModal from './components/HelpModal';

// Pages
import MarketingLandingPage from './pages/MarketingLandingPage';
import JobListingPage from './pages/JobListingPage';
import JobDetailPage from './pages/JobDetailPage';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import CompanyPage from './pages/CompanyPage';
import ApplicationFlow from './pages/ApplicationFlow';
import NotificationsPage from './pages/NotificationsPage';
import MessagingPage from './pages/MessagingPage';
import AdminPanel from './pages/AdminPanel';
import ClientOnboarding from './pages/ClientOnboarding';
import RegistrationPage from './pages/RegistrationPage';
import SigninPage from './pages/SigninPage';

// Layout: full-app shell with navbar + sidebar
const DashboardLayout = () => {
    const { isSidebarCollapsed } = useLayout();
    const [searchParams, setSearchParams] = useSearchParams();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');

    const activeModal = searchParams.get('modal');
    const isResumeUploadOpen = activeModal === 'upload-resume';
    const isHelpOpen = activeModal === 'help';

    const openModal = (modalName) => {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), modal: modalName });
    };
    const closeModal = () => {
        const params = Object.fromEntries(searchParams.entries());
        delete params.modal;
        setSearchParams(params);
    };

    return (
        <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <TopNavbar onMenuToggle={() => setMobileMenuOpen(o => !o)} />
            <div className="flex">
                <ProductTour />
                <LeftSidebar
                    isMobileOpen={mobileMenuOpen}
                    onMobileClose={() => setMobileMenuOpen(false)}
                    isCollapsed={isSidebarCollapsed}
                    selectedFilter={selectedFilter}
                    onFilterSelect={setSelectedFilter}
                    onUploadResume={() => openModal('upload-resume')}
                    onOpenHelp={() => openModal('help')}
                />
                <ResumeUploadModal isOpen={isResumeUploadOpen} onClose={closeModal} />
                <HelpModal isOpen={isHelpOpen} onClose={closeModal} />
                <main className={`flex-1 transition-all duration-300 ease-in-out max-w-full overflow-x-hidden ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                    <Outlet context={{ selectedFilter }} />
                </main>
            </div>
        </div>
    );
};

// Layout: fullscreen (no sidebar) — for landing, onboarding, register
const FullscreenLayout = () => (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
        <Outlet />
    </div>
);

import LandingAnimationPage from './pages/LandingAnimationPage';
import PaymentRoutePage from './pages/PaymentRoutePage';
import PaymentPersonalDetails from './components/payment/PaymentPersonalDetails';
import PaymentOTP from './components/payment/PaymentOTP';
import PaymentVerified from './components/payment/PaymentVerified';
import PaymentCheckout from './components/payment/PaymentCheckout';

function App() {
    return (
        <ThemeProvider>
            <LayoutProvider>
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <Routes>
                        {/* Fullscreen — no sidebar */}
                        <Route element={<FullscreenLayout />}>
                            {/* Root route is the animation */}
                            <Route path="/" element={<LandingAnimationPage />} />
                            
                            {/* Main landing page */}
                            <Route path="/home" element={<MarketingLandingPage />} />
                            
                            {/* Dedicated Sign-In page */}
                            <Route path="/signin" element={<SigninPage />} />
                            
                            {/* Investment/Payment page */}
                            <Route path="/investment" element={<PaymentRoutePage />}>
                                <Route index element={<PaymentPersonalDetails />} />
                                <Route path="otp" element={<PaymentOTP />} />
                                <Route path="verified" element={<PaymentVerified />} />
                                <Route path="paypal" element={<PaymentCheckout />} />
                            </Route>

                            {/* Legacy URL redirects */}
                            <Route path="/login" element={<Navigate to="/signin" replace />} />
                            <Route path="/signup" element={<Navigate to="/signin" replace />} />
                            <Route path="/payment" element={<Navigate to="/investment" replace />} />
                            
                            {/* Active user-flow pages */}
                            <Route path="/onboarding" element={<ClientOnboarding />} />
                            <Route path="/register" element={<RegistrationPage />} />
                            <Route path="/apply" element={<ApplicationFlow />} />
                        </Route>

                        {/* Dashboard — has navbar + sidebar */}
                        <Route element={<DashboardLayout />}>
                            <Route path="/jobs" element={<JobListingPage />} />
                            <Route path="/jobs/:id" element={<JobDetailPage />} />
                            <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
                            <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/edit-profile" element={<EditProfile />} />
                            <Route path="/company" element={<CompanyPage />} />
                            <Route path="/notifications" element={<NotificationsPage />} />
                            <Route path="/messages" element={<MessagingPage />} />
                            <Route path="/admin" element={<AdminPanel />} />
                        </Route>

                        {/* Catch-all fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </LayoutProvider>
        </ThemeProvider>
    );
}

export default App;
