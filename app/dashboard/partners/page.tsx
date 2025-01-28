'use client';

import PrivateRoute from '@/app/components/PrivateRoute';

import React from 'react';
import PartnersTable from './_components/PartnersTable';
import PageHeader from './_components/PageHeader';
import PartnersTableActions from './_components/PartnersTableActions';
import DeletePartnerModal from './_components/DeletePartnerModal';

export default function PartnerPage() {
  const [partnerToDelete, setPartnerToDelete] = React.useState<string | null>(null);

  const handlePartnerDelete = React.useCallback((partnerId: string) => {
    setPartnerToDelete(partnerId);
  }, []);
  const handleOpenChange = React.useCallback((value: string | null) => {
    setPartnerToDelete(value);
  }, []);
  const handleConfirmDelete = React.useCallback(() => {
    // TODO: add api call here
    setPartnerToDelete(null);
  }, []);

  return (
    <PrivateRoute>
      <div className='py-4 lg:px-6 px-3 min-h-screen'>
        <div className='flex items-center justify-between  pb-8'>
          <PageHeader />
          <PartnersTableActions />
        </div>
        <PartnersTable onPartnerDelete={handlePartnerDelete} />
        <DeletePartnerModal
          confirmDelete={handleConfirmDelete}
          isOpen={!!partnerToDelete}
          onOpenChange={handleOpenChange}
        />
      </div>
    </PrivateRoute>
  );
}
