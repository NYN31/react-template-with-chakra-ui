import Service from './index';

const EMPLOYEE_SEARCH_PATH = '/employee';

export default class EmployeeManagement {
  static async findEmployees(page = 0, size = 10) {
    // const params = new URLSearchParams({
    //   page: page,
    //   size: size
    // }).toString();
    //
    // return Service.get(
    //   `${EMPLOYEE_SEARCH_PATH}/list?${params}`,
    //   {
    //     data: {},
    //   }
    // ).then(response => response.data);

    return Service.get(
      `${EMPLOYEE_SEARCH_PATH}/list/${page}/${size}`,
      {
        data: {},
      }
    ).then(response => response.data);
  }

  static async addEmployee(payload) {
    return Service.post(
      `${EMPLOYEE_SEARCH_PATH}`,
      payload
    ).then(response => response.data);
  }
}
