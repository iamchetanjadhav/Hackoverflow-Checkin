import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HackOverflow 4.0 | 3-Day Long National Level Hackathon',
  description: 'HackOverflow 4.0, a prestigious 3-day long National Level Hackathon proudly presented by the Department of Computer Engineering at Pillai HOC College of Engineering and Technology. This Hackathon will be conducted from 11th-13th March in offline mode with separate winners and prizes/swags. The offline mode will take place on the 14-acre PHCET campus, providing participants with Food, Accommodation, Placement Opportunity, and Goodies for all participants. Get all details related to HackOverflow 4.0 for all the process in our Hackathon\'s Brochure.',
  applicationName: 'HackOverflow',
  keywords: ['hackoverflow', 'hackoverflow 4.0', 'hack overflow', 'hack overflow 4.0', 'HackOverflow 4.0', 'National Hackathon', 'PHCET', 'Computer Engineering', 'Innovate', 'Code', 'Transform', 'Schedule', 'Themes', 'Sponsors', 'About', 'Brochure', 'Hosted by PHCET', 'Hackathon', 'Prize Pool', 'Registrations', 'Teams', 'Companies', 'SDGs', 'No Poverty', 'Zero Hunger', 'Good Health', 'Quality Education', 'Gender Equality', 'Clean Water and Sanitation', 'Decent Work', 'Industry & Infrastructure', 'Reduced Inequalities', 'Sustainable Cities', 'Consumption & Production', 'Climate Action', 'Partnerships', 'Life Below Water', 'Life on Land', 'Peace & Justice', 'Affordable & Clean Energy', 'Sponsorship', 'Platinum Sponsor', 'Gold Sponsor', 'General Sponsor', 'FAQ', 'Team Size', 'Hackathon Duration', 'Perks for Participants', 'Transport Facilities', 'Accommodation', 'Offline Track Registration', 'PHCET', 'Pillai HOC College of Engineering and Technology', 'Technology', 'Innovation', 'Learning Environment', 'Campus Amenities', 'Faculty', 'TomTom', 'Glimpses', 'Follow us', '© 2024 HackOverflow 4.0'],
};

export const icons = {
  icon: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}