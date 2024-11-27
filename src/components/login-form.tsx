'use client'

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { login } from '@/app/actions/auth'
import { toast } from '@/components/ui/use-toast'
  

interface LoginFormData {
  identifier: string;
  password: string;
}

export function LoginForm() {
    const router = useRouter()
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginFormData>()
  
    const onSubmit = async (data: LoginFormData) => {
      try {
        await login(data.identifier, data.password)
        toast({
          title: 'Connexion réussie',
          description: 'Vous avez été connecté avec succès',
        })
        router.push('/admin')
      } catch (error) {
        toast({
          title: 'Erreur lors de la connexion',
          description: `Veuillez vérifier vos identifiants : ${error}`,
        })
      }
    }
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <div className="relative mx-auto overflow-hidden before:absolute before:inset-0 before:animate-shine before:bg-[length:200%_100%] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent">
          <Image src="/logo.png" alt="Logo" width={100} height={100} className="mx-auto" />
        </div>
        <CardTitle className="text-2xl">CRM</CardTitle>
        <CardDescription className="text-xs font-bold">made for Spikes Challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register('identifier')}
            />
            {errors.identifier && <span>{errors.identifier.message}</span>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required {...register('password')} />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <Button type="submit" className="w-full" variant="default" disabled={isSubmitting}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}
