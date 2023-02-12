import { Box as BoxType, GameProp } from '../../../../globalUtility/types';
import { Box } from './Box';

export const BoxList = (p: GameProp) => {
    const { game } = p;

    return (
        <>
            <Boxes game={game} />
        </>
    );
};

const Boxes = (p: GameProp) => {
    const { game } = p;
    if (!game.boxes) return <></>;
    const boxes = game.boxes.map((i: BoxType) => {
        return <Box id={i.id} />;
    });
    return <>{boxes}</>;
};
