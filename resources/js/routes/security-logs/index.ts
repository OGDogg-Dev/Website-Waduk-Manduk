import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LogController::index
 * @see app/Http/Controllers/Admin/LogController.php:33
 * @route '/admin/security-logs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/security-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LogController::index
 * @see app/Http/Controllers/Admin/LogController.php:33
 * @route '/admin/security-logs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LogController::index
 * @see app/Http/Controllers/Admin/LogController.php:33
 * @route '/admin/security-logs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LogController::index
 * @see app/Http/Controllers/Admin/LogController.php:33
 * @route '/admin/security-logs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LogController::index
 * @see app/Http/Controllers/Admin/LogController.php:33
 * @route '/admin/security-logs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LogController::index
 * @see app/Http/Controllers/Admin/LogController.php:33
 * @route '/admin/security-logs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LogController::index
 * @see app/Http/Controllers/Admin/LogController.php:33
 * @route '/admin/security-logs'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\LogController::archive
 * @see app/Http/Controllers/Admin/LogController.php:56
 * @route '/admin/security-logs/archive/{archiveFilename}'
 */
export const archive = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: archive.url(args, options),
    method: 'get',
})

archive.definition = {
    methods: ["get","head"],
    url: '/admin/security-logs/archive/{archiveFilename}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LogController::archive
 * @see app/Http/Controllers/Admin/LogController.php:56
 * @route '/admin/security-logs/archive/{archiveFilename}'
 */
archive.url = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { archiveFilename: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    archiveFilename: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        archiveFilename: args.archiveFilename,
                }

    return archive.definition.url
            .replace('{archiveFilename}', parsedArgs.archiveFilename.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LogController::archive
 * @see app/Http/Controllers/Admin/LogController.php:56
 * @route '/admin/security-logs/archive/{archiveFilename}'
 */
archive.get = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: archive.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LogController::archive
 * @see app/Http/Controllers/Admin/LogController.php:56
 * @route '/admin/security-logs/archive/{archiveFilename}'
 */
archive.head = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: archive.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LogController::archive
 * @see app/Http/Controllers/Admin/LogController.php:56
 * @route '/admin/security-logs/archive/{archiveFilename}'
 */
    const archiveForm = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: archive.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LogController::archive
 * @see app/Http/Controllers/Admin/LogController.php:56
 * @route '/admin/security-logs/archive/{archiveFilename}'
 */
        archiveForm.get = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: archive.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LogController::archive
 * @see app/Http/Controllers/Admin/LogController.php:56
 * @route '/admin/security-logs/archive/{archiveFilename}'
 */
        archiveForm.head = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: archive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    archive.form = archiveForm
/**
* @see \App\Http\Controllers\Admin\LogController::archiveNow
 * @see app/Http/Controllers/Admin/LogController.php:106
 * @route '/admin/security-logs/archive-now'
 */
export const archiveNow = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archiveNow.url(options),
    method: 'post',
})

archiveNow.definition = {
    methods: ["post"],
    url: '/admin/security-logs/archive-now',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LogController::archiveNow
 * @see app/Http/Controllers/Admin/LogController.php:106
 * @route '/admin/security-logs/archive-now'
 */
archiveNow.url = (options?: RouteQueryOptions) => {
    return archiveNow.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LogController::archiveNow
 * @see app/Http/Controllers/Admin/LogController.php:106
 * @route '/admin/security-logs/archive-now'
 */
archiveNow.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: archiveNow.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\LogController::archiveNow
 * @see app/Http/Controllers/Admin/LogController.php:106
 * @route '/admin/security-logs/archive-now'
 */
    const archiveNowForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: archiveNow.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\LogController::archiveNow
 * @see app/Http/Controllers/Admin/LogController.php:106
 * @route '/admin/security-logs/archive-now'
 */
        archiveNowForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: archiveNow.url(options),
            method: 'post',
        })
    
    archiveNow.form = archiveNowForm
/**
* @see \App\Http\Controllers\Admin\LogController::download
 * @see app/Http/Controllers/Admin/LogController.php:84
 * @route '/admin/security-logs/download/{archiveFilename}'
 */
export const download = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/security-logs/download/{archiveFilename}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LogController::download
 * @see app/Http/Controllers/Admin/LogController.php:84
 * @route '/admin/security-logs/download/{archiveFilename}'
 */
download.url = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { archiveFilename: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    archiveFilename: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        archiveFilename: args.archiveFilename,
                }

    return download.definition.url
            .replace('{archiveFilename}', parsedArgs.archiveFilename.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LogController::download
 * @see app/Http/Controllers/Admin/LogController.php:84
 * @route '/admin/security-logs/download/{archiveFilename}'
 */
download.get = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\LogController::download
 * @see app/Http/Controllers/Admin/LogController.php:84
 * @route '/admin/security-logs/download/{archiveFilename}'
 */
download.head = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\LogController::download
 * @see app/Http/Controllers/Admin/LogController.php:84
 * @route '/admin/security-logs/download/{archiveFilename}'
 */
    const downloadForm = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\LogController::download
 * @see app/Http/Controllers/Admin/LogController.php:84
 * @route '/admin/security-logs/download/{archiveFilename}'
 */
        downloadForm.get = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\LogController::download
 * @see app/Http/Controllers/Admin/LogController.php:84
 * @route '/admin/security-logs/download/{archiveFilename}'
 */
        downloadForm.head = (args: { archiveFilename: string | number } | [archiveFilename: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const securityLogs = {
    index: Object.assign(index, index),
archive: Object.assign(archive, archive),
archiveNow: Object.assign(archiveNow, archiveNow),
download: Object.assign(download, download),
}

export default securityLogs