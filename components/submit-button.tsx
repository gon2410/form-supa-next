"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface Props {
    defaultLabel: string;
    onPressLabel: string;
}

const SubmitButton = ({defaultLabel, onPressLabel}: Props) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant={"outline"} disabled={pending}>{pending ? onPressLabel : defaultLabel}</Button>
    )
}

export default SubmitButton;