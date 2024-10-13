import NextAuth from 'next-auth';
// import { authOptions } from '../../../auth';
import { authOptions } from '@/app/auth';

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;