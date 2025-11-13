import { forwardRef } from 'react'
import type { InputHTMLAttributes, LegacyRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
    isSelected: boolean
}

export const Radio = forwardRef(function Radio(
    { children, isSelected, ...rest }: Props,
    ref: LegacyRef<HTMLInputElement>,
) {
    return (
        <label className='p-4 w-full flex items-center gap-3 rounded-md border border-solid border-transparent bg-base-button text-base-text uppercase text-buttonM transition-all hover:bg-base-hover data-[state="true"]:bg-purple-light border-purple [&>svg]:text-purple' data-state={isSelected}>
            <input className='hidden' type="radio" ref={ref} {...rest} />
            {children}
        </label>
    )
})