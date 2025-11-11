'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { useToast } from '@/components/ui/use-toast';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      // Decode JWT to get user info (simple decode, not verification)
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const user = {
          id: payload.sub,
          email: payload.email,
          name: null,
          organization: null,
          role: payload.role,
        };

        setAuth(accessToken, refreshToken, user);

        toast({
          title: 'Connexion réussie',
          description: 'Vous êtes maintenant connecté avec Google!',
          variant: 'success',
        });

        router.push('/dashboard');
      } catch (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de récupérer les informations d\'authentification',
          variant: 'destructive',
        });
        router.push('/login');
      }
    } else {
      toast({
        title: 'Erreur',
        description: 'Authentification échouée',
        variant: 'destructive',
      });
      router.push('/login');
    }
  }, [searchParams, setAuth, toast, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-lg text-gray-600">Authentification en cours...</p>
      </div>
    </div>
  );
}
