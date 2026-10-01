import { NextRequest } from 'next/server';
import { API } from '@/lib/api';
import { getToken } from '@/lib/session';

// Browser-side admin calls go through here so the httpOnly session token is attached server-side.
async function forward(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const token = await getToken();
  if (!token) return Response.json({ message: 'Please sign in' }, { status: 401 });
  const { path } = await params;
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const type = req.headers.get('content-type'); if (type) headers.set('content-type', type);
  const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await req.arrayBuffer();
  const res = await fetch(`${API}/${path.join('/')}${req.nextUrl.search}`, { method: req.method, headers, body, cache: 'no-store' });
  return new Response(res.body, { status: res.status, headers: { 'content-type': res.headers.get('content-type') || 'application/json' } });
}
export { forward as GET, forward as POST, forward as PUT, forward as PATCH, forward as DELETE };
