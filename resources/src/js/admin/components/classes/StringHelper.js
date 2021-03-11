class StringHelper {
    // FIXME: убрать отсюда
    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

export default new StringHelper
