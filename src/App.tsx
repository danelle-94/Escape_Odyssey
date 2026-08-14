import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { VisaServices } from './components/VisaServices';
import { WhyChooseUs } from './components/WhyChooseUs';
import { VisaProcess } from './components/VisaProcess';
import { PopularDestinations } from './components/PopularDestinations';
import { TravelInspiration } from './components/TravelInspiration';
import { DocumentChecklist } from './components/DocumentChecklist';
import { CallToAction } from './components/CallToAction';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { VisaAssistanceModal } from './components/VisaAssistanceModal';
import { AdminVisitorDrawer } from './components/AdminVisitorDrawer';
import { trackVisitorEvent } from './lib/analytics';

export function App() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    visaType?: string;
    destination?: string;
  }>({
    isOpen: false,
    visaType: 'Tourist Visa',
    destination: 'Schengen Area',
  });

  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  // Track initial page_view event on mount
  useEffect(() => {
    trackVisitorEvent('page_view');
  }, []);

  const handleOpenModal = (visaType?: string, destination?: string) => {
    setModalState({
      isOpen: true,
      visaType: visaType || 'Tourist Visa',
      destination: destination || 'Schengen Area',
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-gold-500/30 selection:text-gold-300 relative">
      
      {/* Sticky Header Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <Hero onOpenModal={handleOpenModal} />

        {/* 2. Trust & Statistics Strip */}
        <StatsStrip />

        {/* 3. Visa Services Section */}
        <VisaServices onOpenModal={handleOpenModal} />

        {/* 4. Why Choose Escape Odyssey */}
        <WhyChooseUs />

        {/* 5. Visa Journey Step-by-Step Roadmap */}
        <VisaProcess />

        {/* 6. Popular Destinations Grid */}
        <PopularDestinations onOpenModal={handleOpenModal} />

        {/* 7. Travel Inspiration Section */}
        <TravelInspiration onOpenModal={() => handleOpenModal('Tourist Visa', 'Worldwide')} />

        {/* 8. Document Checklist Interactive Tool */}
        <DocumentChecklist onOpenModal={() => handleOpenModal()} />

        {/* 9. High-Impact CTA Section */}
        <CallToAction />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Interactive Visa Assistance Modal */}
      <VisaAssistanceModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        defaultVisaType={modalState.visaType}
        defaultDestination={modalState.destination}
      />

      {/* Admin / Developer FingerprintJS Visitor Journey Inspection Drawer */}
      <AdminVisitorDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
      />

    </div>
  );
}

export default App;
