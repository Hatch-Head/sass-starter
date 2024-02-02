import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


// Polymorphic element
export const ButtonDefaultAsType = 'button' as const
export type ButtonDefaultAsType = typeof ButtonDefaultAsType

export type ButtonOwnProps<E extends React.ElementType> = {
    children: React.ReactNode
    as?: E
}

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
    Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>>