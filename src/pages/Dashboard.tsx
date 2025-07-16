import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import type { User, Role, AuthState } from "../utils/types";

const Dashboard: React.FC<{ authState: AuthState; onLogout: () => void }> = ({ authState, onLogout }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log(authState.user);
                setUser(authState.user ?? undefined);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [authState.token]);

    const StatusBadge = ({ status, label }: { status: boolean; label: string }) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${status ? 'bg-green-500' : 'bg-red-500'
                }`} />
            {label}
        </span>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Welcome back,</p>
                                <p className="font-semibold text-gray-900">{user?.username}</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h2>
                        <p className="text-gray-600">View your account information here!</p>
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 font-bold">!</span>
                            </div>
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                        {/* User Info Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{user?.username}</h3>
                                    <p className="text-blue-100">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="p-6">
                            <div className="space-y-1">
                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">User ID</span>
                                    </div>
                                    <div className="w-2/3">
                                        <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-mono">
                                            {user?.id}
                                        </code>
                                    </div>
                                </div>

                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Username</span>
                                    </div>
                                    <div className="w-2/3">
                                        <span className="text-gray-900 font-semibold">{user?.username}</span>
                                    </div>
                                </div>

                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Email</span>
                                    </div>
                                    <div className="w-2/3">
                                        <span className="text-gray-900">{user?.email}</span>
                                    </div>
                                </div>

                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Account Status</span>
                                    </div>
                                    <div className="w-2/3">
                                        <StatusBadge
                                            status={user?.confirmed ?? false}
                                            label={user?.confirmed ? "Confirmed" : "Unconfirmed"}
                                        />
                                    </div>
                                </div>

                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Access Status</span>
                                    </div>
                                    <div className="w-2/3">
                                        <StatusBadge
                                            status={!(user?.blocked ?? true)}
                                            label={user?.blocked ? "Blocked" : "Active"}
                                        />
                                    </div>
                                </div>

                                {/* Role INFO */}
                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Role Name</span>
                                    </div>
                                    <div className="w-2/3">
                                        <span className="text-gray-900">{user?.role?.name || "-"}</span>
                                    </div>
                                </div>

                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Role Description</span>
                                    </div>
                                    <div className="w-2/3">
                                        <span className="text-gray-900">{user?.role?.description || "-"}</span>
                                    </div>
                                </div>

                                <div className="flex py-4 border-b border-gray-100">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Role ID</span>
                                    </div>
                                    <div className="w-2/3">
                                        <span className="text-gray-900">{user?.role?.id || "-"}</span>
                                    </div>
                                </div>

                                <div className="flex py-4">
                                    <div className="w-1/3">
                                        <span className="font-medium text-gray-700">Role Type</span>
                                    </div>
                                    <div className="w-2/3">
                                        <span className="text-gray-900 capitalize">{user?.role?.type || "-"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;