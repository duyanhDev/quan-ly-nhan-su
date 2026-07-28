// app/register/page.tsx
'use client';

import { useActionState } from 'react';
import { createUser } from '../../actions/user';

type FormState = {
    error?: string;
    success?: boolean;
};

const initialState: FormState = {};

export default function Register() {
    const [state, formAction, pending] = useActionState(createUser, initialState);

    return (
        <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={formAction} className="space-y-6">
                    {state?.error && (
                        <p className="text-sm text-red-400 text-center">{state.error}</p>
                    )}
                    {state?.success && (
                        <p className="text-sm text-green-400 text-center">
                            Tạo tài khoản thành công!
                        </p>
                    )}

                    <div>
                        <label htmlFor="user_name" className="block text-sm/6 font-medium text-gray-100">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="user_name"
                                type="text"
                                name="user_name"
                                required
                                autoComplete="username"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                autoComplete="new-password"
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="isAdmin"
                            type="checkbox"
                            name="isAdmin"
                            className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                        />
                        <label htmlFor="isAdmin" className="text-sm/6 text-gray-100">
                            Đăng ký làm Admin
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={pending}
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
                        >
                            {pending ? 'Đang tạo tài khoản...' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Đã có tài khoản?{' '}
                    <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}