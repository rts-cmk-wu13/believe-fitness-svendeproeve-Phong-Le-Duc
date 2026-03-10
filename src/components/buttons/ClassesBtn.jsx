import Link from 'next/link';


export default function ClassesBtn() {

    return (
        <>
            <Link href="/popular-classes">
                <button
                    className="py-2 px-4 text-black rounded-full"
                    style={{
                        backgroundColor: "var(--background-secondary)"

                    }}
                >
                    Classes
                </button>
            </Link>
        </>
    )
}