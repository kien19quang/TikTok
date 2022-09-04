import { LayoutProps } from '@/models';
import * as React from 'react';

export function AdminLayout({ children }: LayoutProps) {
    return (
        <div>
            <h1>Admin Layout</h1>
            {children}
        </div>
    );
}
