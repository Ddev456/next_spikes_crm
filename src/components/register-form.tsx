'use client';

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

import { useAuthStore } from '@/app/store/auth'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import Image from 'next/image'
const registerSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8)
  })
  

export function RegisterForm() {
    const router = useRouter()
    const { signup } = useAuthStore()
    
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema)
    })
  
    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
      try {
        await signup(data)
        toast.success('Inscription réussie')
        router.push('/auth/login')
      } catch (error) {
        toast.error(`Erreur lors de l'inscription : ${error}`)
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
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="John Doe"
              required
              {...register('username')}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register('email')}
            />
            {errors.email && <span>{errors.email.message}</span>}
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
            Sign up
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}
