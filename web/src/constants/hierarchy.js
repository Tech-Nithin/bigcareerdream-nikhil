import {
    Cpu, LineChart, DollarSign, BarChart, HeartPulse, Wrench, Sprout, Palette, Users, GraduationCap
} from 'lucide-react';

export const HIERARCHY = [
    {
        id: 'engineering', label: 'Engineering', icon: Cpu, color: 'sky',
        departments: [
            { name: 'Software Engineering', subDepts: ['Java Developer', 'Backend Developer', 'Python Developer', 'Frontend Developer', 'Full Stack Developer', 'Mobile Developer', 'Embedded Software Engineer'] },
            { name: 'Data & AI Engineering', subDepts: ['ML Engineer', 'Data Engineer', 'AI Researcher', 'NLP Specialist', 'Computer Vision Engineer'] },
            { name: 'Cloud & DevOps', subDepts: ['SRE', 'Cloud Architect', 'DevOps Engineer', 'Platform Engineer', 'Infrastructure Engineer'] },
            { name: 'IT Infrastructure & Endpoint', subDepts: ['Systems Admin', 'Network Engineer', 'IT Support Specialist', 'Endpoint Mgmt Specialist'] },
            { name: 'Cybersecurity', subDepts: ['SOC Analyst', 'Penetration Tester', 'Security Architect', 'Compliance Officer', 'IAM Engineer'] },
            { name: 'Enterprise Applications & Platforms', subDepts: ['SAP Consultant', 'Salesforce Developer', 'ERP Manager', 'ServiceNow Developer'] },
            { name: 'Hardware & Embedded / Semiconductor', subDepts: ['Embedded Systems Engineer', 'FPGA Developer', 'IC Design Engineer', 'PCB Designer'] },
        ],
    },
    {
        id: 'analytics_business', label: 'Analytics & Business', icon: LineChart, color: 'purple',
        departments: [
            { name: 'Analytics & Business Intelligence', subDepts: ['BI Developer', 'Data Analyst', 'Data Visualization Specialist', 'Reporting Analyst'] },
            { name: 'Business Analysis / Strategy', subDepts: ['Business Analyst', 'Strategy Consultant', 'Operations Researcher', 'Process Improvement Specialist'] },
            { name: 'Project / Program / Agile Mgmt', subDepts: ['Scrum Master', 'Project Manager', 'Program Director', 'Agile Coach', 'PMO Analyst'] },
        ],
    },
    {
        id: 'finance_compliance', label: 'Finance & Compliance', icon: DollarSign, color: 'emerald',
        departments: [
            { name: 'Financial Operations', subDepts: ['Accountant', 'Financial Controller', 'Payroll Specialist', 'AP/AR Analyst'] },
            { name: 'Risk / AML / GRC', subDepts: ['Risk Analyst', 'Compliance Officer', 'AML Investigator', 'GRC Specialist'] },
            { name: 'Asset & License Management', subDepts: ['Asset Manager', 'Software License Compliance', 'ITAM Specialist'] },
        ],
    },
    {
        id: 'sales_customer', label: 'Sales & Customer', icon: BarChart, color: 'orange',
        departments: [
            { name: 'Sales', subDepts: ['Account Executive', 'Sales Manager', 'Business Development Rep', 'Inside Sales Rep'] },
            { name: 'CRM & Customer Platforms', subDepts: ['CRM Administrator', 'Customer Success Manager', 'Platform Support', 'Rev Ops Analyst'] },
            { name: 'Marketing Operations', subDepts: ['Marketing Analyst', 'Growth Marketer', 'SEO Specialist', 'Demand Gen Manager'] },
        ],
    },
    {
        id: 'healthcare_life', label: 'Healthcare & Life Sciences', icon: HeartPulse, color: 'red',
        departments: [
            { name: 'Clinical & Research Operations', subDepts: ['Clinical Researcher', 'Lab Technician', 'Regulatory Affairs', 'CRA', 'Protocol Specialist'] },
            { name: 'Health IT / EHR Systems', subDepts: ['EHR Specialist', 'Health Informatics Analyst', 'System Integration Specialist'] },
            { name: 'Biotechnology & Bioinformatics', subDepts: ['Bioinformatician', 'Biotech Scientist', 'Genomics Expert', 'Computational Biologist'] },
        ],
    },
    {
        id: 'core_non_software', label: 'Core Engineering (Non-SW)', icon: Wrench, color: 'slate',
        departments: [
            { name: 'Electrical Engineering', subDepts: ['Power Systems Engineer', 'Electronics Design Engineer', 'Control Systems Engineer'] },
            { name: 'Mechanical & Manufacturing', subDepts: ['Mechanical Design Engineer', 'Manufacturing Engineer', 'Quality Engineer', 'CNC Programmer'] },
            { name: 'Chemical Engineering', subDepts: ['Process Engineer', 'Chemical Process Analyst', 'HSE Engineer'] },
            { name: 'Civil & Construction', subDepts: ['Civil Engineer', 'Structural Engineer', 'Construction Manager', 'Estimator'] },
            { name: 'Environmental, Health & Safety', subDepts: ['EHS Manager', 'Environmental Engineer', 'Safety Officer'] },
        ],
    },
    {
        id: 'agriculture', label: 'Agriculture', icon: Sprout, color: 'green',
        departments: [
            { name: 'Agronomy Operations', subDepts: ['Agronomist', 'Crop Scientist', 'Agricultural Data Analyst', 'Precision Farming Specialist'] },
        ],
    },
    {
        id: 'design_creative', label: 'Design & Creative', icon: Palette, color: 'pink',
        departments: [
            { name: 'Product / UX Design', subDepts: ['UX Designer', 'UI Designer', 'Product Designer', 'UX Researcher', 'Interaction Designer'] },
            { name: 'Game Design & Interactive', subDepts: ['Game Designer', 'Level Designer', 'Technical Artist', '3D Animator'] },
            { name: 'Media & Photography', subDepts: ['Photographer', 'Videographer', 'Content Creator', 'Motion Designer'] },
        ],
    },
    {
        id: 'hr_people', label: 'HR & People Operations', icon: Users, color: 'amber',
        departments: [
            { name: 'Recruitment & Talent Acquisition', subDepts: ['Technical Recruiter', 'HR Business Partner', 'Talent Acquisition Manager', 'Sourcer'] },
        ],
    },
    {
        id: 'education_early', label: 'Education / Early Career', icon: GraduationCap, color: 'indigo',
        departments: [
            { name: 'Computer Science & Technical Ed', subDepts: ['CS Educator', 'Curriculum Developer', 'Bootcamp Instructor', 'e-Learning Designer'] },
            { name: 'Data Science (Academic)', subDepts: ['Research Associate', 'PhD Candidate - DS', 'Academic Data Analyst'] },
        ],
    },
];
