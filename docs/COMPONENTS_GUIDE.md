# Guide des Composants UI

Ce guide présente tous les composants UI réutilisables créés pour IA Data Insight.

## Table des matières

1. [Composants de base](#composants-de-base)
2. [Composants de formulaires](#composants-de-formulaires)
3. [Composants de feedback](#composants-de-feedback)
4. [Exemples d'utilisation](#exemples-dutilisation)

---

## Composants de base

### Button

Bouton moderne avec plusieurs variantes et tailles.

```tsx
import { Button } from '@/components/ui/button';

// Variantes
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tailles
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🎨</Button>
```

### Input

Champ de saisie stylisé.

```tsx
import { Input } from '@/components/ui/input';

<Input
  type="text"
  placeholder="Entrez votre texte..."
/>

<Input
  type="email"
  placeholder="email@example.com"
  disabled
/>
```

### Label

Étiquette pour les champs de formulaire.

```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

### Card

Conteneur de contenu avec en-tête, contenu et pied de page.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description de la carte</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenu principal de la carte</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Textarea

Zone de texte multi-lignes.

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea
  placeholder="Décrivez votre projet..."
  rows={5}
/>
```

### Select

Menu déroulant de sélection.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Choisir..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Badge

Badge pour afficher des statuts ou des tags.

```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
```

### Avatar

Composant avatar avec image et fallback.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="https://github.com/username.png" alt="@username" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

## Composants de formulaires

### Form avec React Hook Form

Système complet de gestion de formulaires avec validation.

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Schéma de validation avec Zod
const formSchema = z.object({
  username: z.string().min(3, 'Minimum 3 caractères'),
  email: z.string().email('Email invalide'),
  organization: z.string().optional(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                Votre nom d'utilisateur public
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  );
}
```

### FileUpload

Composant d'upload de fichiers avec drag & drop.

```tsx
'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/forms/file-upload';

export function UploadExample() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    console.log('Fichier sélectionné:', selectedFile.name);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <FileUpload
      onFileSelect={handleFileSelect}
      onFileRemove={handleFileRemove}
      currentFile={file}
      accept=".csv,.xlsx,.xls"
      maxSize={50}
    />
  );
}
```

**Props du FileUpload:**
- `onFileSelect`: Fonction appelée lors de la sélection d'un fichier
- `onFileRemove`: Fonction appelée lors de la suppression
- `currentFile`: Fichier actuellement sélectionné
- `accept`: Types de fichiers acceptés (ex: ".csv,.xlsx")
- `maxSize`: Taille maximale en MB (défaut: 50)
- `disabled`: Désactiver l'upload
- `className`: Classes CSS supplémentaires

---

## Composants de feedback

### Toast

Notifications temporaires.

```tsx
'use client';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export function ToastExample() {
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() => {
          toast({
            title: "Succès!",
            description: "Votre fichier a été uploadé.",
            variant: "success",
          });
        }}
      >
        Afficher toast success
      </Button>

      <Button
        onClick={() => {
          toast({
            title: "Erreur!",
            description: "Une erreur est survenue.",
            variant: "destructive",
          });
        }}
      >
        Afficher toast erreur
      </Button>
    </>
  );
}
```

**N'oubliez pas d'ajouter le Toaster dans votre layout:**

```tsx
// app/layout.tsx
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### Alert

Alertes statiques pour afficher des messages importants.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

<Alert variant="default">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Ceci est une information importante.
  </AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Succès</AlertTitle>
  <AlertDescription>
    L'opération s'est terminée avec succès.
  </AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Attention</AlertTitle>
  <AlertDescription>
    Veuillez vérifier vos données avant de continuer.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Erreur</AlertTitle>
  <AlertDescription>
    Une erreur critique s'est produite.
  </AlertDescription>
</Alert>
```

### Dialog (Modal)

Fenêtres modales.

```tsx
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Ouvrir Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce projet ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={() => {
            // Action de suppression
            setOpen(false);
          }}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Exemples d'utilisation

### Formulaire d'authentification complet

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
});

export function LoginForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      // Appel API ici
      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue!',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Email ou mot de passe incorrect',
        variant: 'destructive',
      });
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
```

### Dashboard avec Cards et Badges

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Badge variant="success">Active</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            +2 depuis le mois dernier
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Datasets</CardTitle>
          <Badge variant="secondary">24</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            +5 cette semaine
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Queries</CardTitle>
          <Badge variant="warning">189</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">189</div>
          <p className="text-xs text-muted-foreground">
            +45% ce mois-ci
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Style et Personnalisation

Tous les composants utilisent Tailwind CSS et peuvent être personnalisés via:

1. **Classes CSS**: Ajoutez `className` pour personnaliser
2. **Variantes**: Utilisez les variantes prédéfinies
3. **Theme**: Modifiez les couleurs dans `tailwind.config.ts`

### Personnalisation des couleurs

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#2B6CB0',
        50: '#E6F0FA',
        // ... autres nuances
      },
    },
  },
}
```

---

## Accessibilité

Tous les composants sont construits avec:
- Support clavier complet
- ARIA attributes appropriés
- Focus visible
- Screen reader friendly

---

## Prochaines étapes

Composants à venir:
- [ ] Tabs
- [ ] Accordion
- [ ] DataTable
- [ ] Calendar / DatePicker
- [ ] Command Palette
- [ ] Progress Bar
- [ ] Skeleton Loaders

---

**Dernière mise à jour**: Novembre 2024
