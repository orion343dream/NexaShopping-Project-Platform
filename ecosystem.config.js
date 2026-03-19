module.exports = {
  apps : [{
    name   : "config-server",
    script : "java -jar ./config-server/target/Config-Server-1.0.0.jar"
  },

  {
    name   : "service-registry",
    script : "java -jar ./service-registry/target/Service-Registry-1.0.0.jar"
  },

  {
    name   : "api-gateway",
    script : "java -jar ./api-gateway/target/Api-Gateway-1.0.0.jar"
  }

]
}
