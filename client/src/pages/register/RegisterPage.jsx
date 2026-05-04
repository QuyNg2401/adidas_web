import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { useAuth } from '../../contexts/useAuth'
import { LOGIN_NAV_LINKS } from '../login/loginData'
import { useCart } from '../../contexts/useCart'
import { validateEmail, validateRegisterPassword } from '../../lib/validation'

export function RegisterPage() {
  const auth = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!auth.loading && auth.user) {
    return <Navigate to={auth.user.role === 'admin' ? '/admin' : '/account'} replace />
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    const nameTrim = fullName.trim()
    if (!nameTrim) {
      setError('Vui lòng nhập họ và tên.')
      return
    }
    const emailErr = validateEmail(email)
    const passErr = validateRegisterPassword(password)
    if (emailErr || passErr) {
      setError(emailErr || passErr)
      return
    }
    setSubmitting(true)
    try {
      await auth.register({
        email: email.trim(),
        password,
        fullName: nameTrim,
      })
      await auth.login({ email: email.trim(), password })
      nav('/account')
    } catch (err) {
      setError(err.message ?? 'Register failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans text-body-md antialiased">
      <TopAppBar links={LOGIN_NAV_LINKS} cartCount={cartCount} />

      <main className="flex-grow flex items-center justify-center py-xxl px-margin">
        <div className="w-full max-w-[1440px] grid grid-cols-12 gap-gutter">
          <div className="col-start-1 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4 flex flex-col gap-xl">
            <div className="text-center md:text-left">
              <h1 className="text-display uppercase mb-base">REGISTER</h1>
              <p className="text-body-lg text-secondary">CREATE YOUR ADIDAS ACCOUNT.</p>
            </div>

            <form className="flex flex-col gap-lg" onSubmit={onSubmit} noValidate>
              {error ? (
                <div
                  role="alert"
                  className="border-2 border-black p-md bg-white text-body-sm text-red-800"
                >
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-xs">
                <label className="text-label-bold uppercase text-primary">FULL NAME</label>
                <input
                  className="w-full bg-transparent border-2 border-primary p-md focus:ring-0 focus:border-black outline-none placeholder:text-zinc-400"
                  placeholder="MARCUS REED"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    setError('')
                  }}
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="text-label-bold uppercase text-primary">EMAIL ADDRESS</label>
                <input
                  className="w-full bg-transparent border-2 border-primary p-md focus:ring-0 focus:border-black outline-none placeholder:text-zinc-400"
                  placeholder="ATHLETE@ADIDAS.COM"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="text-label-bold uppercase text-primary">PASSWORD</label>
                <input
                  className="w-full bg-transparent border-2 border-primary p-md focus:ring-0 focus:border-black outline-none placeholder:text-zinc-400"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                />
              </div>

              <button
                className="w-full bg-primary text-on-primary py-lg text-headline-sm uppercase hover:bg-zinc-800 transition-colors active:scale-95 duration-75 disabled:opacity-60"
                type="submit"
                disabled={submitting || auth.loading}
              >
                {submitting ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="text-center pt-md">
              <p className="text-body-md">
                ALREADY A MEMBER?
                <Link
                  to="/login"
                  className="text-headline-sm uppercase border-b-2 border-primary ml-1 hover:bg-primary hover:text-white transition-all px-1"
                >
                  SIGN IN
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

