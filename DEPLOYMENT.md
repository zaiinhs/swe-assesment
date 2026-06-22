# DEPLOYMENT GUIDE

## Deploy to Vercel (Recommended - 2 minutes)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in with GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Paste: `https://github.com/zaiinhs/swe-assesment.git`
   - Click "Import"

3. **Configure Environment Variables**
   - In "Environment Variables" section, add:
   - **Name:** `VITE_ETHERSCAN_API_KEY`
   - **Value:** `<your-etherscan-api-key>`
   - Click "Add"

4. **Deploy**
   - Click "Deploy"
   - Wait ~2-3 minutes
   - Get live URL (e.g., `https://swe-assesment.vercel.app`)

## Alternative: Netlify

1. Go to https://netlify.com
2. Connect GitHub account
3. Select repository
4. Add env var: `VITE_ETHERSCAN_API_KEY`
5. Deploy

## Test Deployment

Once live, test with sample addresses:
- `0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe` (should be AMAN)
- `0x742d35Cc6634C0532925a3b844Bc9e7595f2bD3e` (should be AMAN)

Verify API works: check browser console for successful Etherscan API calls.
