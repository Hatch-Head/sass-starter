'use client';

import { trpc } from '@backend/trpc/client';
import { Button, Hint, Icon, Input } from '@ui/components';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { config } from '../config';

export default function SignupForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    password: string;
    submit: string;
    passwordHint: string;
    hints: {
      signupFailed: {
        title: string;
        message: string;
      };
      verifyEmail: {
        title: string;
        message: string;
      };
    };
  };
}) {
  const signUpMutation = trpc.signUp.useMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, isSubmitted, isSubmitSuccessful, errors },
  } = useForm<{
    email: string;
    password: string;
    name: string;
    serverError?: void;
  }>();

  const onSubmit = (e: FormEvent) => {
    clearErrors('serverError');
    handleSubmit(async ({ email, password, name }) => {
      try {
        const response = await signUpMutation.mutateAsync({ email, password, name });
        console.log('hey response', response);
        await signIn('create-account', {
          email,
          callbackUrl: config.redirectAfterSignin,
          redirect: false,
        });
      } catch (e) {
        setError('serverError', { type: 'invalid' });
      }
    })(e);
  };

  return (
    <>
      {isSubmitted && isSubmitSuccessful ? (
        <Hint
          status="success"
          title={labels.hints.verifyEmail.title}
          message={labels.hints.verifyEmail.message}
          icon={<Icon.mail className="h-4 w-4" />}
        />
      ) : (
        <form className="flex flex-col items-stretch gap-6" onSubmit={onSubmit}>
          {isSubmitted && errors.serverError && (
            <Hint
              status="error"
              title={labels.hints.signupFailed.title}
              message={labels.hints.signupFailed.message}
              icon={<Icon.error className="h-4 w-4" />}
            />
          )}

          <div>
            <label htmlFor="email" className="mb-1 block font-semibold">
              {labels.name} *
            </label>
            <Input
              status={errors.name ? 'error' : 'default'}
              type="text"
              {...register('name', { required: true })}
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block font-semibold">
              {labels.email} *
            </label>
            <Input
              status={errors.email ? 'error' : 'default'}
              type="email"
              {...register('email', { required: true })}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block font-semibold">
              {labels.password} *
            </label>
            <Input
              status={errors.password ? 'error' : 'default'}
              type="password"
              {...register('password', { required: true })}
              required
              autoComplete="new-password"
            />
            <small className="italic opacity-50">{labels.passwordHint}</small>
          </div>

          <Button isLoading={isSubmitting}>{labels.submit} &rarr;</Button>
        </form>
      )}
    </>
  );
}
