/**
 * To Return Common API Response Function
 * @returns 
 */
async function handleReps(response) {
    try {
        let res = {};

        for (const [key, value] of Object.entries(response)) {
            if (value !== undefined && value !== null) {
                let parsedValue;
                let parsedColumn;

                if (!isNaN(value)) {
                    parsedValue = parseInt(value);
                } else {
                    parsedValue = value.toString();
                }

                switch (key) {
                    case 'p_msg':
                        parsedColumn = "Message";
                        break;
                    case 'p_retmsg':
                        parsedColumn = "Message";
                        break;
                    case 'p_rettype':
                        parsedColumn = "MessageType";
                        break;
                    case 'p_user_id':
                        parsedColumn = "UserId";
                        break;
                    case 'p_ret_id':
                        parsedColumn = 'MessageId';
                        break;
                    case 'p_retid':
                        parsedColumn = 'MessageId';
                        break;
                }

                if (parsedColumn) {
                    res[parsedColumn] = parsedValue;
                }
            }
        }
  
        return res;
    } catch (err) {
        console.error('Error processing response:', err);
        throw err;
    }
}

module.exports = { handleReps };
