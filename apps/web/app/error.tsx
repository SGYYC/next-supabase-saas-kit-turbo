'use client';

import { ArrowLeft } from 'lucide-react';

import { useCaptureException } from '@kit/monitoring/hooks';
import { Button } from '@kit/ui/button';
import { Heading } from '@kit/ui/heading';
import { Trans } from '@kit/ui/trans';

import { SiteHeader } from '~/(marketing)/_components/site-header';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useCaptureException(error);

  return (
    <div className={'flex h-screen flex-1 flex-col'}>
      <SiteHeader />

      <div
        className={
          'm-auto flex w-full flex-1 flex-col items-center justify-center'
        }
      >
        <div className={'flex flex-col items-center space-y-16'}>
          <div>
            <h1 className={'font-heading text-9xl font-extrabold'}>500 :(</h1>
          </div>

          <div className={'flex flex-col items-center space-y-4'}>
            <div className={'flex flex-col items-center space-y-2.5'}>
              <div>
                <Heading level={1}>
                  <Trans i18nKey={'common:genericError'} />
                </Heading>
              </div>

              <p className={'text-muted-foreground'}>
                <Trans i18nKey={'common:genericErrorSubHeading'} />
              </p>
            </div>

            <div>
              <Button variant={'outline'} onClick={reset}>
                <ArrowLeft className={'mr-2 h-4'} />

                <Trans i18nKey={'common:goBack'} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
