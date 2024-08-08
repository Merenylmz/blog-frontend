import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Default Title',
    description: 'Default Description',
};

export default function HeadComponent({ title }: { title: string}) {
    return (
        <>
            <title>{title}</title>
        </>
    );
}
