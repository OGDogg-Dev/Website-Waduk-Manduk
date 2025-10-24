import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SettingAppController::edit
 * @see app/Http/Controllers/Admin/SettingAppController.php:23
 * @route '/admin/settingsapp'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/settingsapp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SettingAppController::edit
 * @see app/Http/Controllers/Admin/SettingAppController.php:23
 * @route '/admin/settingsapp'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingAppController::edit
 * @see app/Http/Controllers/Admin/SettingAppController.php:23
 * @route '/admin/settingsapp'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SettingAppController::edit
 * @see app/Http/Controllers/Admin/SettingAppController.php:23
 * @route '/admin/settingsapp'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\SettingAppController::edit
 * @see app/Http/Controllers/Admin/SettingAppController.php:23
 * @route '/admin/settingsapp'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\SettingAppController::edit
 * @see app/Http/Controllers/Admin/SettingAppController.php:23
 * @route '/admin/settingsapp'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\SettingAppController::edit
 * @see app/Http/Controllers/Admin/SettingAppController.php:23
 * @route '/admin/settingsapp'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\SettingAppController::update
 * @see app/Http/Controllers/Admin/SettingAppController.php:50
 * @route '/admin/settingsapp'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/settingsapp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SettingAppController::update
 * @see app/Http/Controllers/Admin/SettingAppController.php:50
 * @route '/admin/settingsapp'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SettingAppController::update
 * @see app/Http/Controllers/Admin/SettingAppController.php:50
 * @route '/admin/settingsapp'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\SettingAppController::update
 * @see app/Http/Controllers/Admin/SettingAppController.php:50
 * @route '/admin/settingsapp'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\SettingAppController::update
 * @see app/Http/Controllers/Admin/SettingAppController.php:50
 * @route '/admin/settingsapp'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const setting = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default setting