export default function FormCreateClass() {
    return (
        <form className="flex flex-col gap-4 p-4 rounded-3xl max-w-md mx-auto mt-8 bg-white">
            <label className="sr-only" htmlFor="className">Class name</label>
            <input type="text" name="className" id="className" placeholder="Class name" className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400" required />

            <label className="sr-only" htmlFor="classDescription">Class description</label>
            <textarea name="classDescription" id="classDescription" placeholder="Class description" className="p-2 rounded-3xl border border-gray-400 placeholder:text-sm placeholder:text-gray-400" rows={3} required />

            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="sr-only" htmlFor="classDay">Class day</label>
                    <input type="text" name="classDay" id="classDay" placeholder="Class day" className="p-2 rounded-full border border-gray-400 w-full placeholder:text-sm placeholder:text-gray-400" required />
                </div>
                <div className="w-1/2">
                    <label className="sr-only" htmlFor="classTime">Class time</label>
                    <input type="text" name="classTime" id="classTime" placeholder="Class time" className="p-2 rounded-full border border-gray-400 w-full placeholder:text-sm placeholder:text-gray-400" required />
                </div>
            </div>

            <label className="sr-only" htmlFor="classTrainer">Class trainer</label>
            <input type="text" name="classTrainer" id="classTrainer" placeholder="Class trainer" className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400" required />

            <label className="sr-only" htmlFor="maxParticipants">Max participants in class</label>
            <input type="number" name="maxParticipants" id="maxParticipants" min={1} placeholder="Max participants" className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400" required />

            <label className="pl-2 -mb-4" htmlFor="classImage">Choose an image</label>
            <input type="file" name="classImage" id="classImage" accept="image/*" className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400" />

            <button
                type="submit"
                className="py-2 px-4 text-black rounded-full"
                style={{ backgroundColor: "var(--background-secondary)" }}
            >
                Create Class
            </button>
        </form>
    );
}