export const Box = (p: { id: number; lives?: number }) => {
    const { id, lives } = p;
    if (lives && lives <= 0) {
        return (
            <div className="text-xl m-4 p-4 w-32 h-32 border border-y-4 border-sky-500">
                {`Box ${id}`}
                <div className="text-base">{lives}</div>
            </div>
        );
    }
    if (!lives && lives !== 0) {
        return (
            <div className="text-xl m-4 p-4 w-32 h-32 border border-y-4 border-blue-500">
                {`Box ${id}`}
                <br />
                <div className="text-base">Click to place bomb</div>
            </div>
        );
    }
    return (
        <div
            className={`text-xl m-4 p-4 w-32 h-32 border border-y-4 ${
                lives > 0 ? 'border-sky-500' : 'border-red-500'
            }`}
        >
            {`Box ${id}`}

            <br />
            <div className="text-lg">{lives > 0 ? `❤️${lives}` : ''}</div>
        </div>
    );
};
