makeEntityService = function(module, entityName) {
    module.factory(entityName+"Service", function($resource){
        var server = 'http://172.24.1.113:8080/api';
        var Entity = $resource(server + '/'+entityName+'s/:entityId',
            {entityId:'@id'});
        return {
            getOne: function (entityId) {
                return Entity.get({entityId: entityId});
            },
            getAll : function () {
                return Entity.query();
            },
            insertOrUpdate: function(entity) {
                console.log(entity);
                return Entity.save(entity);
            },
            deleteOne: function (entity) {
                return entity.$delete()
            }
        }
    })
};
