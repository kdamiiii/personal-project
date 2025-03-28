import { FormInput } from "@/components/forms"

export default function Home() {
    return (
        <div>
            <FormInput name="Username" type="text" placeHolder="john.doe"/>
            <FormInput name="Password" type="password"/>
        </div>
    )
}