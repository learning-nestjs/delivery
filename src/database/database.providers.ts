import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect(
                'mongodb://root:mypassword123456783334@localhost:27018/chanthem',
                { useNewUrlParser: true }
            ),
    },
];