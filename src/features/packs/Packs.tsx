import React, {useEffect} from 'react';
import {Button, Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {createPackTC, getPacksTC, packsActions} from "./packsSlice";
import {useNavigate, useParams} from "react-router-dom";
import SearchAndFilterBlock from "../../common/components/searchAndFilterBlock/SearchAndFilterBlock";
import PacksTable from "./table/PacksTable";
import Paginator from "../../common/components/paginator/Paginator";
import {useDebounce} from "use-debounce";
import {cardsActions} from "../cards/cardsSlice";
import {parseInt} from "lodash";

const Packs = () => {
        const params = useParams()
        const navigate = useNavigate()

        const dispatch = useAppDispatch()
        const queryParams = useAppSelector(state => state.packs.params)
        const debouncedQueryParams = useDebounce(queryParams, 650)
        const totalPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)
        const packsPageSize = useAppSelector(state => state.packs.params.pageCount)
        const addPackHandler = () => dispatch(createPackTC({
            cardsPack: {
                name: 'new Fucking pack',
                deckCover: '',
                private: false
            }
        }))

        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => dispatch(packsActions.setParams({page: newPage}))
        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            dispatch(packsActions.setParams({pageCount: parseInt(event.target.value), page: 0}));
        };

        useEffect(() => {
            dispatch(getPacksTC())

        }, [debouncedQueryParams[0]])


        return (
            <Container style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography component={'span'}>
                        Pack list
                    </Typography>
                    <Button variant={'contained'} onClick={addPackHandler}>
                        Add new pack
                    </Button>
                </div>
                <SearchAndFilterBlock/>
                <Paginator dispatch={dispatch} totalItemsCount={totalPacksCount} pageSize={packsPageSize}
                           page={queryParams.page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage}/>
                <PacksTable/>
            </Container>
        );
    }
;

export default Packs;