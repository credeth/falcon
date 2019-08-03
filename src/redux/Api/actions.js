export const actions = {
    API_REQUEST: 'API_REQUEST'
}
export const apiRequest = (request, onSuccess, onError) => ({
  type: actions.API_REQUEST,
  meta: { request, onSuccess, onError }
});

