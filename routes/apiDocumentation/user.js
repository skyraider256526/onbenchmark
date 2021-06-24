/**
 * @swagger
 * /user/admin-user:
 *  post:
 *    tags:
 *      - User Registration
 *    name: Registration
 *    summary: To Register
 *    consumes:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: user
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            userName:
 *              type: string
 *            password:
 *              type: string
 *            mobileNumber:
 *              type: string
 *            email:
 *              type: string
 *            roleId:
 *              type: number
 *        required:
 *          - firstName
 *          - lastName
 *          - password
 *          - mobileNumber
 *          - email
 *          - panCardNumber
 *          - address
 *          - cityId
 *          - stateId
 *          - landMark
 *          - roleId
 *          - userTypeId:
 *          - internalBranchId
 *    responses:
 *      200:
 *         description: User Created
 *      404:
 *         description: This Mobile number is already Exist/This Email id is already exist
 */
