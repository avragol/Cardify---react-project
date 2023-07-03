import { Box, Skeleton } from '@mui/material'

const CardSkeltonsPartial = () => {
    return <><Box sx={{ margin: '1rem' }}><Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton /><Skeleton /><Skeleton width="60%" />
        <Skeleton width="60%" /><Skeleton />
    </Box>
        <Box sx={{ margin: '1rem' }}><Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton /><Skeleton /><Skeleton width="60%" />
            <Skeleton width="60%" /><Skeleton />
        </Box>
        <Box sx={{ margin: '1rem' }}><Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton /><Skeleton /><Skeleton width="60%" />
            <Skeleton width="60%" /><Skeleton />
        </Box>
        <Box sx={{ margin: '1rem' }}><Skeleton variant="rectangular" width={210} height={118} />
            <Skeleton /><Skeleton /><Skeleton width="60%" />
            <Skeleton width="60%" /><Skeleton />
        </Box></>
};

export default CardSkeltonsPartial;