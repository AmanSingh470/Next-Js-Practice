export default async function ProfilePage({params}: any){
        const { id } = await params;
        
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page {id}</p>
        </div>
    )
}