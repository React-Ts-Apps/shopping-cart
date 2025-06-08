
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this;
    }


    filter() {
        const queryCopy = { ...this.queryStr }

        // Fields to exclude
        const removeFields = ['keyword', 'page', 'sort', 'limit', 'fields']
        removeFields.forEach(param => delete queryCopy[param])

        // Convert to string for regex replacement
        let queryStr = JSON.stringify(queryCopy)

        // Replace gt, gte, lt, lte with $gt, $gte, etc.
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        // Parse the transformed query back into an object
        const filterQuery = JSON.parse(queryStr)

        // Apply to existing query
        this.query = this.query.find(filterQuery)

        return this
    }


}
export default ApiFeatures