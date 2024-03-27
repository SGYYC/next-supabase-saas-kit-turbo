'use server';

import { RedirectType, redirect } from 'next/navigation';

import { Logger } from '@kit/shared/logger';
import { requireAuth } from '@kit/supabase/require-auth';
import { getSupabaseServerActionClient } from '@kit/supabase/server-actions-client';

import { PersonalAccountsService } from './services/personal-accounts.service';

export async function deletePersonalAccountAction(formData: FormData) {
  const confirmation = formData.get('confirmation');

  if (confirmation !== 'DELETE') {
    throw new Error('Confirmation required to delete account');
  }

  const session = await requireAuth(getSupabaseServerActionClient());

  if (session.error) {
    redirect(session.redirectTo);
  }

  const client = getSupabaseServerActionClient();
  const service = new PersonalAccountsService(client);
  const userId = session.data.user.id;

  Logger.info(
    {
      userId,
      name: 'accounts',
    },
    `Deleting personal account...`,
  );

  await service.deletePersonalAccount(
    getSupabaseServerActionClient({ admin: true }),
    {
      userId,
    },
  );

  Logger.info(
    {
      userId,
      name: 'accounts',
    },
    `Personal account deleted successfully.`,
  );

  await client.auth.signOut();

  redirect('/', RedirectType.replace);
}
