import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../views/app/Index.vue'
import Reports from '../views/app/reports/Index.vue'
import Workflow from '../views/app/dashboard/Index.vue'
import Error from '../views/app/Error.vue'
import UserLogin from '../views/user/Login.vue'
import LocalisationSettings from '../views/app/settings/Localisation.vue'
import SolutionSettings from '../views/app/settings/Solution.vue'
import PosesSettings from '../views/app/settings/Poses.vue'
import InstallationSettings from '../views/app/settings/Installation.vue'
import ObstacleSettings from '../views/app/settings/Obstacle.vue'
import EquipementSettings from '../views/app/settings/Equipement.vue'
import ConditionnementSettings from '../views/app/settings/Conditionnement.vue'
import TensionSettings from '../views/app/settings/Tension.vue'
import FabricantBatteriesSettings from '../views/app/settings/FabricantBatteries.vue'
import TypeBatteriesSettings from '../views/app/settings/TypeBatteries.vue'
import CapacitesBatteriesSettings from '../views/app/settings/CapacitesBatteries.vue'
import FabricantRegulateurSettings from '../views/app/settings/FabricantRegulateur.vue'
import TypeRegulateurSettings from '../views/app/settings/TypeRegulateur.vue'
import CapacitesRegulateurSettings from '../views/app/settings/CapacitesRegulateur.vue'
import FabricantOnduleurSettings from '../views/app/settings/FabricantOnduleur.vue'
import TypeOnduleurSettings from '../views/app/settings/TypeOnduleur.vue'
import CapacitesOnduleurSettings from '../views/app/settings/CapacitesOnduleur.vue'
import FabricantPanneauxSettings from '../views/app/settings/FabricantPanneaux.vue'
import TypePanneauxSettings from '../views/app/settings/TypePanneaux.vue'
import CapacitesPanneauxSettings from '../views/app/settings/CapacitesPanneaux.vue'
import UserSettings from '../views/app/settings/Utilisateur.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    redirect: '/app/reports',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('jules-user-connected') != null && localStorage.getItem('jules-user-connected').length > 0) {
        next()
      } else {
        localStorage.removeItem('jules-user-connected')
        next({ name: 'user/login' })
      }
    },
    children: [
      { path: 'app/reports', component: Reports },
      { path: 'app/dashboard/:siteId', component: Workflow },
      { path: 'app/localisation-settings', component: LocalisationSettings },
      { path: 'app/solution-settings', component: SolutionSettings },
      { path: 'app/poses-settings', component: PosesSettings },
      { path: 'app/installation-settings', component: InstallationSettings },
      { path: 'app/obstacle-settings', component: ObstacleSettings },
      { path: 'app/equipement-settings', component: EquipementSettings },
      { path: 'app/conditionnement-settings', component: ConditionnementSettings },
      { path: 'app/tension-settings', component: TensionSettings },
      { path: 'app/fabricant-batteries-settings', component: FabricantBatteriesSettings },
      { path: 'app/type-batteries-settings', component: TypeBatteriesSettings },
      { path: 'app/capacites-batteries-settings', component: CapacitesBatteriesSettings },
      { path: 'app/fabricant-regulateur-settings', component: FabricantRegulateurSettings },
      { path: 'app/type-regulateur-settings', component: TypeRegulateurSettings },
      { path: 'app/capacites-regulateur-settings', component: CapacitesRegulateurSettings },
      { path: 'app/fabricant-onduleurs-settings', component: FabricantOnduleurSettings },
      { path: 'app/type-onduleurs-settings', component: TypeOnduleurSettings },
      { path: 'app/capacites-onduleurs-settings', component: CapacitesOnduleurSettings },
      { path: 'app/fabricant-panneaux-settings', component: FabricantPanneauxSettings },
      { path: 'app/type-panneaux-settings', component: TypePanneauxSettings },
      { path: 'app/capacites-panneaux-settings', component: CapacitesPanneauxSettings },
      { path: 'app/user-settings', component: UserSettings }
    ]
  },
  { path: '/error', component: Error },
  { path: '/login', name: 'user/login', component: UserLogin}
]

const router = new VueRouter({
  routes
})

export default router
