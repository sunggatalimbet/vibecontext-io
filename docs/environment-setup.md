# Environment Setup Guide

This guide helps you set up separate development and production environments with their own Supabase projects and OAuth configurations.

## 🏗️ Architecture

```
Development Environment:
├── Supabase Dev Project
├── Google OAuth (localhost)
├── GitHub OAuth (localhost)
└── .env.local

Production Environment:
├── Supabase Prod Project
├── Google OAuth (your domain)
├── GitHub OAuth (your domain)
└── .env.production
```

## 🔧 Step 1: Create Development Supabase Project

1. **Go to [Supabase Dashboard](https://supabase.com/dashboard)**
2. **Create New Project**:
   - **Name**: `vibecontext-dev`
   - **Organization**: Same as your production project
   - **Database Password**: Set a secure password
   - **Region**: Same as production for consistency
3. **Wait for project creation** (2-3 minutes)
4. **Copy project details**:
   - Project URL: `https://[DEV-PROJECT-REF].supabase.co`
   - Anon Key: From Settings → API
   - Service Role Key: From Settings → API

## 🔧 Step 2: Create Development OAuth Apps

### Google OAuth (Development)

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **APIs & Services** → **Credentials**
3. **Create OAuth 2.0 Client ID**:

   ```
   Application type: Web application
   Name: vibecontext.io (Development)

   Authorized JavaScript origins:
   - http://localhost:3000
   - http://localhost:3001

   Authorized redirect URIs:
   - https://[DEV-PROJECT-REF].supabase.co/auth/v1/callback
   ```

4. **Copy Client ID and Client Secret**

### GitHub OAuth (Development)

1. **Go to [GitHub Settings](https://github.com/settings/developers)**
2. **OAuth Apps** → **New OAuth App**:
   ```
   Application name: vibecontext.io (Development)
   Homepage URL: http://localhost:3001
   Authorization callback URL: https://[DEV-PROJECT-REF].supabase.co/auth/v1/callback
   ```
3. **Copy Client ID and Client Secret**

## 🔧 Step 3: Configure Supabase Authentication

### Development Supabase Project

1. **Go to your dev Supabase project** → **Authentication** → **Providers**

2. **Configure Google Provider**:

   - Enable Google
   - Client ID: (from development Google OAuth)
   - Client Secret: (from development Google OAuth)

3. **Configure GitHub Provider**:

   - Enable GitHub
   - Client ID: (from development GitHub OAuth)
   - Client Secret: (from development GitHub OAuth)

4. **Site URL Configuration**:
   - Site URL: `http://localhost:3001`
   - Redirect URLs: `http://localhost:3001/auth/callback`

### Production Supabase Project (when ready)

1. **Create production OAuth apps** with your production domain
2. **Configure providers** with production credentials
3. **Set site URL** to your production domain

## 🔧 Step 4: Environment Configuration

### Development Environment

Create `apps/web/.env.local`:

```bash
# Development Supabase Project
NEXT_PUBLIC_SUPABASE_URL=https://[DEV-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_dev_supabase_service_role_key
```

### Production Environment (when deploying)

Create `apps/web/.env.production`:

```bash
# Production Supabase Project
NEXT_PUBLIC_SUPABASE_URL=https://[PROD-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_prod_supabase_service_role_key
```

## 🧪 Testing

### Development Testing

1. **Start dev server**: `pnpm dev`
2. **Visit**: `http://localhost:3001/auth/login`
3. **Test both providers**:
   - "Continue with Google"
   - "Continue with GitHub"
4. **Check auth status** on homepage debug component
5. **Verify users** in dev Supabase Dashboard → Authentication → Users

### Verification Checklist

- [ ] Development Supabase project created
- [ ] Google OAuth (dev) configured in Supabase
- [ ] GitHub OAuth (dev) configured in Supabase
- [ ] .env.local updated with dev credentials
- [ ] Google login works from localhost
- [ ] GitHub login works from localhost
- [ ] Users appear in dev Supabase dashboard
- [ ] Debug component shows correct provider info

## 🔐 Security Benefits

✅ **Complete separation** of dev/prod data
✅ **Dev credentials can't access prod**
✅ **Prod credentials can't access dev**  
✅ **No risk of dev code affecting production**
✅ **Independent OAuth configurations**

## 🚀 Next Steps

1. **Complete development setup** (this guide)
2. **Develop and test** your application
3. **Create production OAuth apps** when ready to deploy
4. **Set up production Supabase project**
5. **Configure production environment variables**

## 📝 Notes

- The Supabase callback URL is the same pattern for both environments
- Only the project reference changes: `[PROJECT-REF].supabase.co`
- Google OAuth origins will be different (localhost vs your domain)
- GitHub OAuth homepage URLs will be different
- All callback URLs point to their respective Supabase projects
