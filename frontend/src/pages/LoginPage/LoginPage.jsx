import AuthForm from "./components/AuthForm";

export default function LoginPage() {
    document.title = "Bejelentkezés"
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="mx-auto w-full max-w-md text-center">
                    <h1 className="text-5xl">Filc</h1>
                    <AuthForm />
                </div>
            </div>
        </>
    )
}