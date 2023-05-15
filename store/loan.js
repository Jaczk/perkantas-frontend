// export const strict = false
export const state = () => ({
    loan_id: '',
    good_id: '',
})

export const mutations = {
    updateLoanId(state, payload) {
        state.loan_id = payload
    },
    updateGoodId(state, payload){
        state.good_id = payload
    }
}

