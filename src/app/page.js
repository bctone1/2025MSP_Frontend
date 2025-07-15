'use client';

export default function HomePage() {

    return (
        <div>
            <button
                className="w-100 h-100 bg-gray-100 border border-black-100 cursor-pointer"
                onClick={() => { window.location.href = "/user"; }}
            >
                사용자
            </button>

            <button
                className="w-100 h-100 bg-gray-100 border border-black-100 cursor-pointer"
                onClick={() => { window.location.href = "/admin"; }}
            >
                관리자
            </button>
        </div>
    );
}