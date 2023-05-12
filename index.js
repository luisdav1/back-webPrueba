import { sequelize } from './api/database/database.js'
import app from './api/app.js'

const main = async () => {
  try {
    await sequelize.sync({ force: false })
    app.listen(app.get('port'), () => {
      console.log(`🔥🔥🔥 Server running on port ${app.get('port')} 🔥🔥🔥`)
    })
  } catch (err) {
    console.error(`Error trying to connect to the database: ${err}`)
  }
}

main()