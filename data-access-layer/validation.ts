import { CollectionInfo, ListCollectionsCursor, MongoClient } from 'mongodb';
import { dbName } from './common';

/**
 * @function setupJsonSchema Sets up validation and schema for the Mongo DB.
 * @param connection A connected MongoClient or void value in the event of
 *                   a connection error.
 */
export async function setupJsonSchema(connection: MongoClient | void): Promise<void> {
    const db = connection && connection.db(dbName);

    if (db) {
        // Grab collection meta-data from the DB to prevent from re-runs over existing schema.
        const collectionNames: CollectionInfo | Pick<CollectionInfo, 'name' | 'type'>[] = (
            await connection.db(dbName).listCollections().toArray()
        );
        
        /**
         * @description
         * Before setting the schema and validators, ensure its not being rerun in order to avoid critical errors.
         * This would occur if build is run several times or if unit tests are run against an already prepared database.
         */
        if (collectionNames.filter(({name}: {name: string}) => {
            return name === 'comments' || name === 'posts'
        }).length === 0) {

            db?.createCollection('posts', {
                validationLevel: 'strict',
                validationAction: 'warn',
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: [
                            'author',
                            'content',
                            'title',
                            'timestamp'
                        ],
                        properties: {
                            author: {
                                bsonType: 'string',
                                description: 'Validate the author is of type string and exists.'
                            },
                            content: {
                                bsonType: 'string',
                                description: 'Validate the content is of type string and exists.'
                            },
                            title: {
                                bsonType: 'string',
                                description: 'Validate the title is of type string and exists.'
                            },
                            timestamp: {
                                bsonType: 'string',
                                description: 'Validate the ISO timestamp is of type string and exists.'
                            }
                        },
                    }
                }
            });
    
            db?.createCollection('comments', {
                validationLevel: 'strict',
                validationAction: 'warn',
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: [
                            'author',
                            'comment',
                            'uuid'
                        ],
                        properties: {
                            author: {
                                bsonType: 'string',
                                description: 'Validate that the author is of type string and exists.'
                            },
                            comment: {
                                bsonType: 'string',
                                description: 'Validate that the comment is of type string and exists.'
                            },
                            uuid: {
                                bsonType: 'string',
                                description: 'Validate that the uuid is of type string and exists.'
                            }
                        },
                    }
                }
            });
        }
    }
}
