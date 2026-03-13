"use client";
import { useActionState } from "react";
import { createClass } from "@/lib/dal/classes";

const initialState = {
    className: null,
    classDescription: null,
    classDay: null,
    classTime: null,
    classTrainer: null,
    maxParticipants: null,
    assetId: null,

};

export default function FormCreateClass({ userId, trainerName }) {
    const [state, formAction, isPending] = useActionState(createClass, initialState);

    return (
        <form action={formAction} encType="multipart/form-data" className="flex flex-col gap-4 p-4 rounded-3xl max-w-md mx-auto mt-8 bg-white">
            <div>
                <label className="sr-only" htmlFor="className">Class name</label>
                <input type="text" name="className" id="className" placeholder="Class name" className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400 placeholder:pl-2" required />
                <span className=" text-red-500 text-xs pl-2 mt-1 min-h-[1.5em]">{state && state.className?.errors?.[0]}</span>
            </div>
            <div>
                <label className="sr-only" htmlFor="classDescription">Class description</label>
                <textarea name="classDescription" id="classDescription" placeholder="Class description" className="p-2 rounded-3xl border border-gray-400 placeholder:text-sm placeholder:text-gray-400 placeholder:pl-2" rows={3} required />
                <span className=" text-red-500 text-xs pl-2 mt-1 min-h-[1.5em]">{state && state.classDescription?.errors?.[0]}</span>
            </div>

            <div className="flex gap-4">
                <div className="w-1/2">
                    <label className="sr-only" htmlFor="classDay">Class day</label>
                    <select name="classDay" id="classDay" className="p-2 rounded-full border border-gray-400 w-full placeholder:text-sm placeholder:text-gray-400 placeholder:pl-2" required defaultValue="">
                        <option value="" disabled={true} >Select class day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <span className=" text-red-500 text-xs pl-2 mt-1 min-h-[1.5em]">{state && state.classDay?.errors?.[0]}</span>
                </div>

                <div className="w-1/2">
                    <label className="sr-only" htmlFor="classTime">Class time</label>
                    <input type="text" name="classTime" id="classTime" placeholder="Class time" className="p-2 rounded-full border border-gray-400 w-full placeholder:text-sm placeholder:text-gray-400 placeholder:pl-2" required />
                    <span className=" text-red-500 text-xs pl-2 mt-1 min-h-[1.5em]">{state && state.classTime?.errors?.[0]}</span>
                </div>
            </div>

            <div className="w-1/2">
                <label className="sr-only" htmlFor="trainerId">Class trainer</label>
                <input
                    type="text"
                    name="classTrainer"
                    id="classTrainer"
                    readOnly
                    defaultValue={trainerName}
                    placeholder="Class trainer"
                    className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400 placeholder:pl-2"
                    required
                />
                <input type="hidden" name="trainerId" value={userId} />
                <span className=" text-red-500 text-xs pl-2 mt-1 min-h-[1.5em]">
                    {state && state.trainerId?.errors?.[0]}
                </span>
            </div>

            <div>
                <label className="sr-only" htmlFor="maxParticipants">Max participants in class</label>
                <input type="number" name="maxParticipants" id="maxParticipants" placeholder="Max participants" className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400 placeholder:pl-2" required />
                <span className=" text-red-500 text-xs pl-2 mt-1 min-h-[1.5em]">{state && state.maxParticipants?.errors?.[0]}</span>
            </div>
            <div>
                <label className="pl-2 -mb-4" htmlFor="file">Choose an image</label>
                <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" placeholder="Asset ID" className="p-2 rounded-full border border-gray-400 placeholder:text-sm placeholder:text-gray-400 placeholder:pl-2" />
                <span className=" text-red-500 text-xs pl-2 mt-1 min-h-[1.5em]">{state && state.assetId?.errors?.[0]}</span>
            </div>
            {/* <input type="hidden" name="trainerId" value={userId} /> */}
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