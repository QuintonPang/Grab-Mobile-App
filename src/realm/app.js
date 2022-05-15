import { REALM_APP_ID } from "@env";
import { createRealmContext } from '@realm/react'
import { OrderSchema, UserSchema, DestinationSchema, OriginSchema } from './schemas'

export default createRealmContext({
    schema:[OrderSchema,UserSchema, DestinationSchema, OriginSchema],
    schemaVersion: 6, // for migration
    })

export const appConfig = { id: REALM_APP_ID, timeout:10000, /* deleteRealmIfMigrationNeeded:true */ }

