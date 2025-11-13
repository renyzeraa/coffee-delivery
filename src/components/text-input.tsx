import {
    type FocusEvent,
    type HTMLAttributes,
    type InputHTMLAttributes,
    type LegacyRef,
    forwardRef,
    useState,
} from 'react'

import type { FieldError } from 'react-hook-form'

type Props = InputHTMLAttributes<HTMLInputElement> & {
    optional?: boolean
    containerProps?: HTMLAttributes<HTMLDivElement>
    error?: FieldError
}

export const TextInput = forwardRef(function TextInput(
    { optional, error, containerProps, onFocus, onBlur, ...rest }: Props,
    ref: LegacyRef<HTMLInputElement>,
) {
    const [isFocused, setIsFocused] = useState(false)

    function handleFocus(event: FocusEvent<HTMLInputElement, Element>) {
        setIsFocused(true)
        onFocus?.(event)
    }

    function handleBlur(event: FocusEvent<HTMLInputElement, Element>) {
        setIsFocused(false)
        onBlur?.(event)
    }

    return (
        <div className='flex flex-col gap-2' {...containerProps}>
            <label className='flex items-center justify-between rounded-md border border-solid border-base-button bg-base-input transition-all data-[state="focused"]:border-yellow-dark data-[state="blurred"]:border-base-button' data-state={isFocused ? 'focused' : 'blurred'}>
                <input
                    className='text-base-text w-full bg-transparent border-none p-3 outline-none placeholder:text-base-label'
                    type="text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={ref}
                    {...rest}
                />

                {optional ? <span className='text-base-label pr-3 italic text-textS'>Opcional</span> : null}
            </label>

            {error?.message ? (
                <p className='text-textXS text-red-600' role="alert">{error.message}</p>
            ) : null}
        </div>
    )
})