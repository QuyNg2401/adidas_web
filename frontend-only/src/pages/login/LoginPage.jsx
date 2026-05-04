import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { LOGIN_FOOTER, LOGIN_NAV_LINKS, LOGIN_PAGE } from './loginData'
import { LoginFooter } from './components/LoginFooter'

export function LoginPage() {
  const auth = useAuth()
  const { cartCount } = useCart()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const result = await auth.login({ email, password })
      nav(result.user?.role === 'admin' ? '/admin' : '/account')
    } catch (err) {
      setError(err.message ?? 'Login failed')
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
              <h1 className="text-display uppercase mb-base">{LOGIN_PAGE.title}</h1>
              <p className="text-body-lg text-secondary">{LOGIN_PAGE.subtitle}</p>
            </div>

            <form className="flex flex-col gap-lg" onSubmit={onSubmit}>
              <div className="flex flex-col gap-xs">
                <label className="text-label-bold uppercase text-primary">
                  {LOGIN_PAGE.emailLabel}
                </label>
                <input
                  className="w-full bg-transparent border-2 border-primary p-md focus:ring-0 focus:border-black outline-none placeholder:text-zinc-400"
                  placeholder={LOGIN_PAGE.emailPlaceholder}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-xs">
                <div className="flex justify-between items-end">
                  <label className="text-label-bold uppercase text-primary">
                    {LOGIN_PAGE.passwordLabel}
                  </label>
                  <a
                    className="text-label-bold uppercase text-secondary hover:text-primary transition-colors"
                    href="#"
                  >
                    {LOGIN_PAGE.forgotLabel}
                  </a>
                </div>
                <input
                  className="w-full bg-transparent border-2 border-primary p-md focus:ring-0 focus:border-black outline-none placeholder:text-zinc-400"
                  placeholder={LOGIN_PAGE.passwordPlaceholder}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-sm">
                <input
                  className="w-5 h-5 border-2 border-primary rounded-none text-primary focus:ring-0"
                  id="remember"
                  type="checkbox"
                />
                <label className="text-label-bold uppercase" htmlFor="remember">
                  {LOGIN_PAGE.rememberLabel}
                </label>
              </div>

              <button
                className="w-full bg-primary text-on-primary py-lg text-headline-sm uppercase hover:bg-zinc-800 transition-colors active:scale-95 duration-75"
                type="submit"
                disabled={submitting || auth.loading}
              >
                {submitting ? 'SIGNING IN...' : LOGIN_PAGE.submitLabel}
              </button>
            </form>

            {error ? (
              <div className="border-2 border-black p-md bg-white text-body-sm">
                {error}
              </div>
            ) : null}

            <div className="text-center pt-md">
              <p className="text-body-md">
                {LOGIN_PAGE.notMemberLabel}
                <Link
                  to="/register"
                  className="text-headline-sm uppercase border-b-2 border-primary ml-1 hover:bg-primary hover:text-white transition-all px-1"
                >
                  {LOGIN_PAGE.registerLabel}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-1/4 bg-surface-container -z-10 border-l-2 border-black">
        <div className="h-full w-full flex items-center justify-center opacity-10 grayscale overflow-hidden">
          <div className="text-[200px] leading-none font-black italic -rotate-90 select-none">
            PERFORMANCE
          </div>
        </div>
      </div>

      <LoginFooter data={LOGIN_FOOTER} />
    </div>
  )
}

